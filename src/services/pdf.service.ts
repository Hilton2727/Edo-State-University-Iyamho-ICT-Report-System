
import { Ticket } from "@/types";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Extend jsPDF type to include autoTable properties
interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

export const generateTicketPDF = (ticket: Ticket) => {
  // Initialize the PDF document
  const doc = new jsPDF() as jsPDFWithAutoTable;
  
  // Add university logo (in a real app, you would use an actual logo)
  doc.setFontSize(20);
  doc.setTextColor(0, 71, 171); // University blue
  doc.text("EDO STATE UNIVERSITY IYAMHO", 105, 20, { align: "center" });
  
  // Add department title
  doc.setFontSize(16);
  doc.text("ICT Support Department", 105, 30, { align: "center" });
  
  // Add report title
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(`INCIDENT REPORT: ${ticket.id}`, 105, 45, { align: "center" });
  
  // Add ticket metadata
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 200, 60, { align: "right" });
  
  // Ticket details table
  autoTable(doc, {
    startY: 70,
    head: [["Field", "Details"]],
    body: [
      ["Ticket ID", ticket.id],
      ["Title", ticket.title],
      ["Status", ticket.status],
      ["Priority", ticket.priority],
      ["Category", ticket.category],
      ["Location", ticket.location],
      ["Reported By", `${ticket.createdBy.name} (${ticket.createdBy.role})`],
      ["Reported On", new Date(ticket.createdAt).toLocaleString()],
      ["Assigned To", ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"],
      ["Last Updated", new Date(ticket.updatedAt).toLocaleString()],
    ],
    headStyles: { fillColor: [0, 71, 171] },
  });
  
  // Description
  doc.setFontSize(12);
  doc.text("Description:", 14, doc.lastAutoTable.finalY + 10);
  doc.setFontSize(10);
  const descriptionLines = doc.splitTextToSize(ticket.description, 180);
  doc.text(descriptionLines, 14, doc.lastAutoTable.finalY + 20);
  
  // Comments
  let currentY = doc.lastAutoTable.finalY + 30 + descriptionLines.length * 5;
  
  if (ticket.comments.length > 0) {
    doc.setFontSize(12);
    doc.text("Comments:", 14, currentY);
    currentY += 10;
    
    ticket.comments.forEach((comment, index) => {
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      const date = new Date(comment.createdAt).toLocaleString();
      doc.text(`${comment.user.name} (${date}):`, 14, currentY);
      doc.setFont(undefined, "normal");
      
      const commentLines = doc.splitTextToSize(comment.content, 180);
      doc.text(commentLines, 14, currentY + 5);
      
      currentY += 15 + commentLines.length * 5;
    });
  }
  
  // Attachments
  if (ticket.attachments.length > 0) {
    doc.setFontSize(12);
    doc.text("Attachments:", 14, currentY);
    currentY += 10;
    
    ticket.attachments.forEach(attachment => {
      doc.setFontSize(10);
      const size = (attachment.size / 1024).toFixed(2);
      doc.text(`• ${attachment.name} (${size} KB)`, 14, currentY);
      currentY += 7;
    });
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      "Edo State University Iyamho ICT Support Department - Confidential",
      105,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );
  }
  
  return doc;
};

export const saveTicketAsPDF = (ticket: Ticket) => {
  const doc = generateTicketPDF(ticket);
  doc.save(`Incident_Report_${ticket.id}.pdf`);
};

export const printTicket = (ticket: Ticket) => {
  const doc = generateTicketPDF(ticket);
  doc.autoPrint();
  doc.output('dataurlnewwindow');
};
