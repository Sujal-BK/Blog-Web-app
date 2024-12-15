import React from 'react'
import Layout from '../Layout/Layout'
import {TypeAnimation} from 'react-type-animation'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <Layout >
            <div className='min-h-full flex flex-col justify-center items-center font-[Poppins] gap-3 '>
                <div >
                    <TypeAnimation 
                    sequence={[
                        "Unleash Your Voice: Share Your Story",1000,
                        "Write, Share, Inspire: Your Journey Awaits",1000,
                        "Craft Your Narrative: Blog Your Heart Out",1000,
                        "Express Yourself: Where Ideas Take Flight",1000,
                        "Your Canvas, Your Words: Paint Your Passion",1000,
                        "Share Your Spark: Illuminate the World with Your Words",1000
                    ]}
                    wrapper='span'
                    speed={50}
                    repeat={Infinity}
                    className='text-2xl  md:text-4xl '
                    />
                </div>
                <div className='font-semibold text-zinc-700 animate-pulse'>Create a unique and beautiful blog easily.</div>
                <div className='p-2 bg-blue-500 text-white rounded-md  mt-7 hover:scale-105 duration-100'><Link to='/add-blog'>Create Blog</Link></div>

               <div className='m-5 p-10 font-[Poppins] animate-pulse'>
                <p>The Blog App is a user-friendly platform designed for individuals and organizations to create, share, and manage their content effortlessly. With its intuitive interface and powerful rich text editor, users can easily format their posts, add images, and create visually appealing articles. The app offers customizable themes, allowing bloggers to reflect their personal or brand identity. Features such as categories and tags help organize content, while a built-in commenting system fosters engagement with readers. Additionally, the app integrates seamlessly with social media for easy sharing and includes an analytics dashboard to track performance and user interactions. With built-in SEO tools, mobile responsiveness, and user accounts for managing blogs, the Blog App caters to a wide range of use cases—from personal blogging to professional and business content creation. Ultimately, it serves as a vibrant community where ideas flourish, enabling users to express their creativity and connect with audiences around the world. </p>
               </div>
               
            </div>
        </Layout>
    )
}

export default Home
