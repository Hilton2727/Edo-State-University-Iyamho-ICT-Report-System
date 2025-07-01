import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Trash2 } from "lucide-react";
import { deleteStudent, deleteStaff } from '@/services/api.service';
import { Badge, getRoleBadgeClass } from '@/components/ui/badge';

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
};

const Reporter = () => {
  const [tab, setTab] = useState<'student' | 'staff'>('student');
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (tab === 'student') {
        const res = await axios.get('/api/user/list_students.php');
        setStudents(res.data.students || []);
      } else {
        const res = await axios.get('/api/user/list_staff.php');
        setStaff(res.data.staff || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [tab]);

  const handleViewProfile = async (id: number) => {
    setLoading(true);
    const res = await axios.get(`/api/user/${tab === 'student' ? 'student_profile' : 'staff_profile'}.php?id=${id}`);
    setSelectedProfile(res.data[tab === 'student' ? 'student' : 'staff']);
    setProfileModalOpen(true);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setLoading(true);
    try {
      if (tab === 'student') {
        await deleteStudent(String(id));
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } else {
        await deleteStaff(String(id));
        setStaff((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (error) {
      alert('Failed to delete user.');
    }
    setLoading(false);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Reporter ({tab === 'student' ? 'Students' : 'Staff'})</CardTitle>
        <CardDescription>List of all {tab === 'student' ? 'student reporters' : 'staff reporters'}</CardDescription>
        <div className="flex gap-2 mt-4">
          <Button variant={tab === 'student' ? 'default' : 'outline'} onClick={() => setTab('student')}>Students</Button>
          <Button variant={tab === 'staff' ? 'default' : 'outline'} onClick={() => setTab('staff')}>Staff</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{tab === 'student' ? 'Matric Number' : 'Staff ID'}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{tab === 'student' ? 'Year' : 'Department'}</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(tab === 'student' ? students : staff).map((person, idx) => (
                  <tr key={person.id}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <Avatar className="h-8 w-8 mr-2">
                        {person.profile_photo ? (
                          <img src={`/${person.profile_photo}`} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium">{person.name}</span>
                    </td>
                    <td className="px-4 py-2">{tab === 'student' ? person.mat_no : person.staff_id || 'N/A'}</td>
                    <td className="px-4 py-2">{tab === 'student' ? person.level : person.department || 'N/A'}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile(person.id)}>
                        <Eye className="w-4 h-4 mr-1" /> View Profile
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(person.id)}>
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent>
          {selectedProfile && (
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                {selectedProfile.profile_photo ? (
                  <img src={`/${selectedProfile.profile_photo}`} alt="Avatar" className="h-24 w-24 rounded-full object-cover" />
                ) : (
                  <AvatarFallback className="text-2xl">{getInitials(selectedProfile.name)}</AvatarFallback>
                )}
              </Avatar>
              <h2 className="text-xl font-bold mb-1">{selectedProfile.name}</h2>
              <div className="mb-2 flex items-center gap-2">
                <Badge className={getRoleBadgeClass(selectedProfile.role || (tab === 'student' ? 'Student' : 'Staff'))}>{selectedProfile.role || (tab === 'student' ? 'Student' : 'Staff')}</Badge>
              </div>
              <div className="mb-2 text-gray-500">Email: {selectedProfile.email}</div>
              {tab === 'student' ? (
                <>
                  <div className="mb-2">Matric Number: {selectedProfile.mat_no}</div>
                  <div className="mb-2">Level: {selectedProfile.level}</div>
                  <div className="mb-2">Faculty: {selectedProfile.faculty}</div>
                  <div className="mb-2">Department: {selectedProfile.department}</div>
                  <div className="mb-2">Gender: {selectedProfile.gender}</div>
                </>
              ) : (
                <>
                  <div className="mb-2">Staff ID: {selectedProfile.staff_id}</div>
                  <div className="mb-2">Faculty: {selectedProfile.faculty}</div>
                  <div className="mb-2">Department: {selectedProfile.department}</div>
                  <div className="mb-2">Gender: {selectedProfile.gender}</div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Reporter; 