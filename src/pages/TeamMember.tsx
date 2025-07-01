import { useEffect, useState } from "react";
import { fetchAdmins, fetchTechs, fetchAdminProfile, fetchTechProfile, deleteAdmin, deleteTech, createAdmin, createTech } from "@/services/api.service";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge, getRoleBadgeClass } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { User, Wrench, CheckCircle, Eye, Trash2, Plus } from "lucide-react";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const DEFAULT_PASSWORD_HASH = "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";

const TeamMember = () => {
  const [tab, setTab] = useState<'admin' | 'tech'>('admin');
  const [admins, setAdmins] = useState<any[]>([]);
  const [techs, setTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [memberType, setMemberType] = useState<'admin' | 'tech' | ''>('');
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (tab === 'admin') {
        const res = await fetchAdmins();
        setAdmins(res.admins || []);
      } else {
        const res = await fetchTechs();
        setTechs(res.techs || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [tab]);

  const handleViewProfile = async (id: number) => {
    setLoading(true);
    if (tab === 'admin') {
      const res = await fetchAdminProfile(id);
      setSelectedProfile(res.admin);
    } else {
      const res = await fetchTechProfile(id);
      setSelectedProfile(res.tech);
    }
    setProfileModalOpen(true);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    setLoading(true);
    try {
      if (tab === 'admin') {
        await deleteAdmin(String(id));
        setAdmins((prev) => prev.filter((a) => a.id !== id));
      } else {
        await deleteTech(String(id));
        setTechs((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      alert('Failed to delete user.');
    }
    setLoading(false);
  };

  const members = tab === 'admin' ? admins : techs;

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let result;
      if (memberType === 'admin') {
        result = await createAdmin({
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        });
      } else {
        result = await createTech({
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
          password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
          phone: formData.phone,
          specialization: formData.specialization,
        });
      }
      if (result.success) {
        setSuccess(true);
        setStep(2);
        // Refresh the list
        if (memberType === 'admin') {
          const res = await fetchAdmins();
          setAdmins(res.admins || []);
        } else {
          const res = await fetchTechs();
          setTechs(res.techs || []);
        }
      } else {
        alert(result.error || 'Failed to add member');
      }
    } catch (err) {
      alert('Failed to add member');
    }
    setSubmitting(false);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Team Members ({tab === 'admin' ? 'Admins' : 'Technicians'})</CardTitle>
        <CardDescription>List of all {tab === 'admin' ? 'admin' : 'technician'} team members</CardDescription>
        <div className="flex gap-2 mt-4 items-center">
          <Button variant={tab === 'admin' ? 'default' : 'outline'} onClick={() => setTab('admin')}>Admins</Button>
          <Button variant={tab === 'tech' ? 'default' : 'outline'} onClick={() => setTab('tech')}>Technicians</Button>
          <Button className="ml-auto flex items-center gap-2" onClick={() => { setAddDialogOpen(true); setStep(0); setMemberType(''); setFormData({}); setSuccess(false); }}>
            <Plus className="h-4 w-4" /> Add Member
          </Button>
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
                  {tab === 'tech' && <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>}
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member, idx) => (
                  <tr key={member.id}>
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <Avatar className="h-8 w-8 mr-2">
                        {member.profile_photo ? (
                          <img src={`/${member.profile_photo}`} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </td>
                    {tab === 'tech' && <td className="px-4 py-2">{member.specialization || '-'}</td>}
                    <td className="px-4 py-2">{member.email}</td>
                    <td className="px-4 py-2">
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewProfile(member.id)}>
                        <Eye className="h-4 w-4 mr-1" /> View Profile
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
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
                <Badge className={getRoleBadgeClass(selectedProfile.role)}>{selectedProfile.role}</Badge>
              </div>
              <div className="mb-2 text-gray-500">{selectedProfile.email}</div>
              {tab === 'tech' && <div className="mb-2">Specialization: {selectedProfile.specialization || '-'}</div>}
              {tab === 'tech' && <div className="mb-2">Phone: {selectedProfile.phone || '-'}</div>}
              {tab === 'tech' && <div className="mb-2">Gender: {selectedProfile.gender || '-'}</div>}
              {tab === 'admin' && <div className="mb-2">Profile Photo: {selectedProfile.profile_photo ? 'Yes' : 'No'}</div>}
              <div className="mb-2">Created: {selectedProfile.created_at}</div>
              <div className="mb-2">Updated: {selectedProfile.updated_at}</div>
              {/* Add more fields as needed */}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="mb-4 flex justify-center gap-2">
            {[0,1,2].map((s) => (
              <div key={s} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step===s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s+1}</div>
            ))}
          </div>
          {step === 0 && (
            <div>
              <p className="mb-4 text-center">Select the type of team member to add:</p>
              <div className="flex gap-6 justify-center">
                <div
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all w-32 ${memberType==='admin' ? 'border-blue-600 bg-blue-50 shadow' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                  onClick={()=>setMemberType('admin')}
                  tabIndex={0}
                  role="button"
                  aria-pressed={memberType==='admin'}
                >
                  <User className={`h-8 w-8 mb-2 ${memberType==='admin' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${memberType==='admin' ? 'text-blue-700' : 'text-gray-700'}`}>Admin</span>
                  <span className="text-xs text-gray-500 mt-1">Full access</span>
                </div>
                <div
                  className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all w-32 ${memberType==='tech' ? 'border-blue-600 bg-blue-50 shadow' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                  onClick={()=>setMemberType('tech')}
                  tabIndex={0}
                  role="button"
                  aria-pressed={memberType==='tech'}
                >
                  <Wrench className={`h-8 w-8 mb-2 ${memberType==='tech' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${memberType==='tech' ? 'text-blue-700' : 'text-gray-700'}`}>Technician</span>
                  <span className="text-xs text-gray-500 mt-1">Support staff</span>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button disabled={!memberType} onClick={()=>setStep(1)}>Next</Button>
              </DialogFooter>
            </div>
          )}
          {step === 1 && (
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input className="w-full border rounded p-2" required value={formData.name||''} onChange={e=>setFormData({...formData, name:e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input className="w-full border rounded p-2" type="email" required value={formData.email||''} onChange={e=>setFormData({...formData, email:e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Gender</label>
                <select className="w-full border rounded p-2" required value={formData.gender||''} onChange={e=>setFormData({...formData, gender:e.target.value})}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {memberType==='tech' && (
                <>
                  <div>
                    <label className="block mb-1 font-medium">Phone</label>
                    <input className="w-full border rounded p-2" value={formData.phone||''} onChange={e=>setFormData({...formData, phone:e.target.value})} />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Specialization</label>
                    <input className="w-full border rounded p-2" value={formData.specialization||''} onChange={e=>setFormData({...formData, specialization:e.target.value})} />
                  </div>
                </>
              )}
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={()=>setStep(0)}>Back</Button>
                <Button type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add'}</Button>
              </DialogFooter>
            </form>
          )}
          {step === 2 && (
            <div className="text-center">
              <CheckCircle className="mx-auto mb-2 text-green-600" size={48} />
              <p className="mb-2 text-green-600 font-semibold">Successfully added!</p>
              <p className="mb-4">The login details have been sent to the respective team member.</p>
              <DialogFooter className="mt-6">
                <Button onClick={()=>{ setAddDialogOpen(false); setStep(0); setMemberType(''); setFormData({}); setSuccess(false); }}>Done</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TeamMember; 