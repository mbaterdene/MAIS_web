import { IoIosAdd } from "react-icons/io";
import { useAtom } from "jotai";
import { isMenuOpen } from "../../ThemeAtom";

const Sidebar = () => {

  const [ismenuOpen] = useAtom(isMenuOpen);

  return (
    <div className={`fixed top-0 w-[25%] mt-20 border bg-white min-h-full z-30 p-4 ${ismenuOpen ? "hidden" : "block"}`}>
        <div className="flex flex-row justify-between items-center mb-4">
            <span>News tabs</span>
            <button className="rounded-full hover:bg-gray-200 p-1">
                <IoIosAdd className='text-2xl' />
            </button>
        </div>
    </div>
  )
}

export default Sidebar