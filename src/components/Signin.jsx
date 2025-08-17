import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/api/client';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/userSlice';

function Signin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const signin = async (e)=>{
    e.preventDefault()
    try {
      const res = await login({"email": email, "password": password})
      if(res){
        dispatch(authLogin(res))
        navigate("/")
      }
    } catch (error) {
      console.error("ERROR:", error)
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-gray-800'>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Enter your email below to Sign in to your account</CardDescription>
          <CardAction>
            <Button variant="link"><Link to="/signup">Sign Up</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={signin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" required />
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

export default Signin;
