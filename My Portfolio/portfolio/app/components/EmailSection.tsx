import React from 'react'
import GithubIcon from '../../public/github-icon.svg'
import LinkedinIcon from "../../public/linkedin-icon.svg"
import Link from 'next/link'
import Image from "next/image"

const EmailSection = () => {
  return (
    <section className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4">
        <div>
            <h5 className="text-xl font-bold text-white my-2">Let&apos;s connect</h5>

            <p className="text-[#adb7be] mb-4 max-w-md">I&apos;m currently looking for new opportunities</p>
        
        
          <div className="social flex flex-row gap-2">
            <Link href="https://github.com" target="_blank">
              <Image src={GithubIcon} alt='Github Icon'/>
            </Link>

            <Link href="https://linkedin.com" target="_blank">
              <Image src={LinkedinIcon} alt='Linkedin Icon'/>
            </Link>
          </div>

        </div>

        <div>
          <form className='flex flex-col'>
            <div className='mb-6'>
              <label htmlFor='email' className='text-white block mb-2 text-sm font-medium'>Your email</label>
              <input type='email' id='email' required placeholder='mail@mail.com' className='bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5'/>
            </div>

            <div className='mb-6'>
              <label htmlFor='subject' className='text-white block text-sm mb-2 font-medium'>Subject</label>
              <input type='text' id='subject' required placeholder='say hi' className='bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5'/>
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

            <button type='submit' className='bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 px-5 rounded-lg w-full'>
              Send Message
            </button>
            
          </form>
        </div>
    </section>
  )
}

export default EmailSection


//https://youtu.be/Kb1f5bvF6f4?list=PLaYsth8JnnBRRuHargaQ3o7md60bOTNak&t=5812