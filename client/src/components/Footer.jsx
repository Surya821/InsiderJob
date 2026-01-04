import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between py-3 mt-20 gap-4'>
            <img width={160} src={assets.logo} alt="" />
            <p className='flex-1 border-; border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Surya | All right reserved.</p>
            <div className='flex gap-2.5'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.instagram_icon} alt="" />
            </div>
        </div>
    )
}

export default Footer 