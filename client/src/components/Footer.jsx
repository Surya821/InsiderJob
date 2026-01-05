import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between py-3 mt-20 gap-4'>
            <img width={160} src={assets.logo} alt="" />
            <p className='flex-1 border-; border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Surya | All right reserved.</p>
            <div className='flex gap-2.5'>
                <a href="https://github.com/Surya821" target='_blank' rel="noreferrer">
                    <img className='cursor-pointer' title="GitHub Profile" src={assets.github_logo} alt="" />
                </a>
                <a href="https://www.linkedin.com/in/surya-pratap-singh1/" target='_blank' rel="noreferrer">
                    <img className='cursor-pointer' title="LinkedIn Profile" src={assets.linkedin_logo} alt="" />
                </a>
                <a href="https://surya-pratap-singh-portfolio.vercel.app/" target='_blank' rel="noreferrer">
                    <img className='cursor-pointer' title="My Portfolio Website" src={assets.instagram_icon} alt="" />
                </a>
            </div>
        </div>
    )
}

export default Footer 