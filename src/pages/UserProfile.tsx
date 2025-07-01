import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ticketService } from "@/services/data.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BadgeCheck, Mail, User as UserIcon, Key, Shield, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateProfileApi, updatePasswordApi } from "../services/api.service";
import axios from "axios";

const UserProfile = () => {
  const { user, logout } = useAuth();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarDeleting, setAvatarDeleting] = useState(false);
  
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const data = await updateProfileApi({
        id: user?.id,
        role: user?.role,
        name,
        email,
      });
      if (!data.success) {
        toast.error(data.error || "Profile update failed");
      } else {
        toast.success("Profile updated successfully");
        const updatedUser = { ...user, name, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      }
    } catch (err: any) {
      toast.error("Profile update failed");
    }
    setIsSaving(false);
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setIsChangingPassword(true);
    try {
      const data = await updatePasswordApi({
        id: user?.id,
        role: user?.role,
        password: newPassword,
      });
      if (!data.success) {
        toast.error(data.error || "Password update failed");
      } else {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      toast.error("Password update failed");
    }
    setIsChangingPassword(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    formData.append("id", user?.id);
    formData.append("role", user?.role === "Technician" ? "tech" : user?.role.toLowerCase());
    setAvatarUploading(true);
    try {
      const res = await axios.post("/api/user/upload_profile_photo.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        toast.success("Profile photo updated!");
        const updatedUser = { ...user, profile_photo: res.data.profilePhoto };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      } else {
        toast.error(res.data.error || "Upload failed");
      }
    } catch (err) {
      toast.error("Upload failed");
    }
    setAvatarUploading(false);
  };

  const handleAvatarDelete = async () => {
    setAvatarDeleting(true);
    try {
      const res = await axios.post("/api/user/delete_profile_photo.php", {
        id: user?.id,
        role: user?.role.toLowerCase(),
      });
      if (res.data.success) {
        toast.success("Profile photo deleted!");
        const updatedUser = { ...user, profile_photo: null };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      } else {
        toast.error(res.data.error || "Delete failed");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
    setAvatarDeleting(false);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  {user?.profile_photo ? (
                    <img
                      src={"/" + user.profile_photo}
                      alt="Avatar"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {user ? getInitials(user.name) : ""}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                <div className="flex items-center mb-3">
                  <Badge className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                    {user?.role}
                  </Badge>
                  {(user?.role === "Admin" || user?.role === "Technician") && (
                    <BadgeCheck className="h-4 w-4 text-blue-500 ml-1" />
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={handleAvatarClick}
                  disabled={avatarUploading}
                >
                  {avatarUploading ? "Uploading..." : "Change Avatar"}
                </Button>
                {user?.profile_photo && (
                  <Button
                    variant="secondary"
                    className="w-full mb-2"
                    onClick={handleAvatarDelete}
                    disabled={avatarDeleting}
                  >
                    {avatarDeleting ? "Deleting..." : "Delete Avatar"}
                  </Button>
                )}
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-gray-500" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>
                Update your account profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label>User Role</Label>
                    <Input
                      value={user?.role}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-sm text-gray-500">
                      Your role determines what permissions you have in the system.
                      Contact an administrator to change your role.
                    </p>
                  </div>
                  
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Key className="mr-2 h-5 w-5 text-gray-500" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="mb-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isChangingPassword}>
                    {isChangingPassword ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-gray-500" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Receive email notifications for ticket updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">In-App Notifications</h4>
                    <p className="text-sm text-gray-500">
                      Show notifications within the application
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Status Change Alerts</h4>
                    <p className="text-sm text-gray-500">
                      Get notified when ticket status changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Comment Alerts</h4>
                    <p className="text-sm text-gray-500">
                      Get notified when someone comments on your ticket
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Simple badge component
const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <span className={className}>{children}</span>;
};

export default UserProfile;
