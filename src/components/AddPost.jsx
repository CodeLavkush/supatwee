import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { addTweet } from '@/api/client';
import { useDispatch } from 'react-redux';
import { addTweets } from '../store/tweetSlice';

function AddPost() {

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await addTweet({"title": title, "body": message})
      if(res != null){
        dispatch(addTweets(res))
        setTitle('')
        setMessage('')
      }
    } catch (error) {
      console.error("ERROR:", error)
    }
  }
  return (
    <div className='w-screen h-screen bg-gray-900 '>
      <div className='w-full h-full p-10 flex justify-center items-center'>
        <div className='w-200 h-200 bg-gray-800 rounded-2xl p-20'>
          <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center gap-4'>
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-2xl text-white font-bold tracking-wide ">Title</Label>
                <Input id="title" value={title} onChange={(e)=> setTitle(e.target.value)} type="text" className="text-white" placeholder="Write your title here..." required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message" className="text-2xl text-white font-bold tracking-wide ">Message</Label>
                <Textarea id="message" value={message} onChange={(e)=> setMessage(e.target.value)} type="textArea" className="text-white" placeholder="Write your message here..." required />
              </div>
              <div className='grid gap-2 px-60'>
                <button type='submit' className="btn btn-primary">Post</button>
              </div>
          </form>
          <div className='w-full flex items-left'>
            <Link to="/" className='text-2xl link link-primary'>Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost
