import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Student");
  const [matNo, setMatNo] = useState("");
  const [level, setLevel] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [staffId, setStaffId] = useState("");

  const facultyDepartments = {
    "Faculty of Arts, Management & Social Sciences": [
      "Accounting",
      "Banking & Finance",
      "Business Administration",
      "Economics",
      "English",
      "History & International Studies",
      "Mass Communication",
      "Political Science",
      "Public Administration",
      "Sociology",
      "Entrepreneurship",
      "Peace Studies & Conflict Resolution"
    ],
    "Faculty of Science": [
      "Biochemistry",
      "Computer Science",
      "Microbiology",
      "Mathematics",
      "Physics (including Physics with Electronics)",
      "Industrial Chemistry",
      "Animal & Environmental Biology",
      "Plant Science & Biotechnology",
      "Cybersecurity & Software Engineering"
    ],
    "Faculty of Engineering": [
      "Chemical Engineering",
      "Civil Engineering",
      "Computer Engineering",
      "Electrical & Electronic Engineering",
      "Mechanical Engineering",
      "Mechatronics / Production Engineering"
    ],
    "Faculty of Law": [
      "Law (LL.B)"
    ],
    "Faculty of Applied Health Sciences": [
      "Nursing Science",
      "Medical Laboratory Science"
    ],
    "College of Basic Medical Sciences": [
      "Anatomy",
      "Biochemistry",
      "Physiology",
      "Ophthalmology"
    ],
    "College of Clinical Sciences": [
      "Medicine & Surgery (MBBS)"
    ],
    "Additional Programmes": [
      "Postgraduate (PGD, MSc, MPhil, PhD) in various departments"
    ]
  };
  const [faculty, setFaculty] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (role === "Student" && !matNo) {
      setError("Matriculation number is required for students");
      return;
    }

    if (role === "Student" && !level) {
      setError("Level is required for students");
      return;
    }

    if (role === "Student" && !faculty) {
      setError("Faculty is required for students");
      return;
    }

    if ((role === "Student" || role === "Staff") && !gender) {
      setError("Gender is required for this role");
      return;
    }

    if ((role === "Staff" || role === "Student") && !department) {
      setError("Department is required for this role");
      return;
    }

    if (role === "Staff" && !staffId) {
      setError("Staff ID is required for staff");
      return;
    }

    if (role === "Staff" && !faculty) {
      setError("Faculty is required for staff");
      return;
    }

    if (role === "Staff" && !department) {
      setError("Department is required for staff");
      return;
    }

    try {
      if (role === "Student") {
        await register(name, email, password, role, matNo, level, gender, department, faculty);
      } else if (role === "Staff") {
        await register(name, email, password, role, undefined, undefined, gender, department, faculty, staffId);
      } else {
      await register(name, email, password, role);
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 mt-[40px]">
        <div className="mt-50px text-center">
          <img src="/logo.png" alt="Logo" className="mx-auto" style={{ height: "150px", width: "auto" }} />
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Register to access the ICT support portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="mb-4">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rick23.morty@edouniversity.edu.ng"
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                >
                  <SelectTrigger id="role" className="mt-1">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-xs text-gray-500">
                  Note: In a real system, role selection would be restricted based on email domain or approval process.
                </p>
              </div>

              {role === "Student" && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="matNo">Matriculation Number</Label>
                    <Input
                      id="matNo"
                      type="text"
                      value={matNo}
                      onChange={(e) => setMatNo(e.target.value)}
                      placeholder="Enter your matriculation number"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="level">Level</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger id="level" className="mt-1 w-full">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100L">100L</SelectItem>
                        <SelectItem value="200L">200L</SelectItem>
                        <SelectItem value="300L">300L</SelectItem>
                        <SelectItem value="400L">400L</SelectItem>
                        <SelectItem value="500L">500L</SelectItem>
                        <SelectItem value="600L">600L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select
                      value={faculty}
                      onValueChange={(value) => {
                        setFaculty(value);
                        setDepartment("");
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(facultyDepartments).map((fac) => (
                          <SelectItem key={fac} value={fac}>{fac}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {faculty && (
                    <div className="mb-4">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={department}
                        onValueChange={setDepartment}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {facultyDepartments[faculty].map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              {(role === "Student" || role === "Staff") && (
                <div className="mb-4">
                  <Label>Gender</Label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        className="mr-2"
                      />
                      Female
                    </label>
                  </div>
                </div>
              )}

              {role === "Staff" && (
                <>
                  <div className="mb-4">
                    <Label>Staff ID</Label>
                    <Input
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      placeholder="Enter your staff ID"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Faculty</Label>
                    <Select
                      value={faculty}
                      onValueChange={(value) => {
                        setFaculty(value);
                        setDepartment("");
                      }}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(facultyDepartments).map((fac) => (
                          <SelectItem key={fac} value={fac}>{fac}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {faculty && (
                    <div className="mb-4">
                      <Label>Department</Label>
                      <Select
                        value={department}
                        onValueChange={setDepartment}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {facultyDepartments[faculty].map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Register;
