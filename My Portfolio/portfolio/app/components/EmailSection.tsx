"use client";
import React, {useState} from 'react'
import GithubIcon from '../../public/github-icon.svg'
import LinkedinIcon from "../../public/linkedin-icon.svg"
import Link from 'next/link'
import Image from "next/image"

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const data = {
      email: (form.email as HTMLInputElement).value,
      subject: (form.subject as HTMLInputElement).value,
      message: (form.message as HTMLTextAreaElement).value,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200)
    {
      console.log('Message sent.');
      setEmailSubmitted(true);
    }
  }
  return (
    <section className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4">
        <div>
            <h5 className="text-xl font-bold text-white my-2">Let&apos;s connect</h5>

            <p className="text-[#adb7be] mb-4 max-w-md">I&apos;m currently looking for new opportunities</p>
        
        
          <div className="social flex flex-row gap-2">
            <Link href="https://github.com" target="_blank">
              <Image src={GithubIcon} alt='Github Icon' className='duration-200 hover:scale-110'/>
            </Link>

            <Link href="https://linkedin.com" target="_blank">
              <Image src={LinkedinIcon} alt='Linkedin Icon' className='duration-200 hover:scale-110'/>
            </Link>
          </div>

        </div>

        <div>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='email' className='text-white block mb-2 text-sm font-medium'>Your email</label>
              <input name='email' type='email' id='email' required placeholder='mail@mail.com' className='bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5'/>
            </div>

            <div className='mb-6'>
              <label htmlFor='subject' className='text-white block text-sm mb-2 font-medium'>Subject</label>
              <input name='subject' type='text' id='subject' required placeholder='say hi' className='bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5'/>
            </div>

            <div className='mb-6'>
              <label htmlFor='message' className='text-white block text-sm mb-2 font-medium'>
                Message
              </label>

              <textarea
                name="message"
                id="message"
                placeholder="Let's talk about..."
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              />
            </div>

            <button type='submit' className='bg-primary hover:bg-purple-800 cursor-pointer text-white font-medium py-2.5 px-5 rounded-lg w-full duration-300 hover:scale-105'>
              Send Message
            </button>
            {
              emailSubmitted && (
                <p className="text-green-500 text-sm mt-2">
                  Email sent successfully!
                </p> 
              )
            }
            
          </form>
        </div>
    </section>
  )
}

export default EmailSection

