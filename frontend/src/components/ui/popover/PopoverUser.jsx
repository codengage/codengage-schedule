import * as Popover from '@radix-ui/react-popover';
import { RxAvatar, RxCrossCircled} from 'react-icons/rx'
import { usePocket } from "../../../contexts/PocketContext"; 
import { useNavigate } from "react-router-dom";

export default function PopoverUser(){
    const { logout, user, pb } = usePocket();
    const username = user.username;
    const navigate = useNavigate();

    const handleClick = () => navigate("/Userspace")

  return(
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="mt-[20%] items-center">
        <img src={pb.files.getUrl(user, user.avatar)} alt="Avatar" style={{ width: '200px', }}/>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align='start' className="rounded px-2 py-5 w-[260px] bg-white dark:bg-dark-100 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-[15px] leading-[19px] font-medium mb-1 border-b">
              <label>{username}</label>
            </p>
            <fieldset className="flex justify-end">
            <button className='bg-blue-400 w-[60%] text-white rounded shadow-sm hover:shadow-red-500'
                onClick={handleClick}
                >
                UserArea
              </button>
              <button className='bg-red-500 w-[60%] text-white rounded shadow-sm hover:shadow-red-500'
                onClick={logout}>
                Deslogar
              </button>
            </fieldset>
          </div>
          <Popover.Close  className="rounded-full -top-2 -right-2 bg-white dark:bg-dark-100 h-[25px] w-[25px] inline-flex items-center justify-center text-codengage-purple dark:text-white absolute hover:bg-violet4 dark:hover:bg-dark-200"
            aria-label="Close"
          >
            <RxCrossCircled size={30} />
          </Popover.Close>
          <Popover.Arrow className="fill-white dark:fill-dark-100" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}