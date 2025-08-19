import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signUp } from '@/api/client';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [gender, setGender] = useState('select gender');
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    try {
      const data = {
        "full_name": name,
        "age": Number(age),
        "email": email,
        "password": password,
      }
      const res = await signUp(data)
      if(res != null){
        navigate("/")
      }
    } catch (error) {
      console.error("ERROR:", error)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-800">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your information below to create an account</CardDescription>
          <CardAction>
            <Button variant="link">
              <Link to="/signin">Sign in</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="john doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" value={age} onChange={(e)=> setAge(e.target.value)} type="text" placeholder="100" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" required />
              </div>
              <div className="grid gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{gender}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Gender</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={gender} onValueChange={setGender} onChange={(e)=> setGender(e.target.value)}>
                      <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="female">Female</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="others">Others</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
