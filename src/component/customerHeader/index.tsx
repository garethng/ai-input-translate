import { useEffect, useState } from "react"
import {Avatar,Button} from "@nextui-org/react";
import { useStorage } from "@plasmohq/storage/hook"

export function Header() {
  const [isLogIn, setIsLogIn] = useStorage<boolean>("isLogIn")
  const [avatar_src, setAvatar] = useState("")
  useEffect(() => {
    setAvatar(get_avatar(isLogIn))
    
  })
  
  function get_avatar(is_login: boolean) {
    if (is_login) {
      return chrome.runtime.getURL("/assets/avatar_login.png");
    } else {
      return chrome.runtime.getURL("/assets/avatar_signoff.png");
    }
  }

  const onPress = ((isLogin: boolean) => {
    setIsLogIn(isLogin)
    setAvatar(get_avatar(isLogin))
  })
  return (
        <div className="flex gap-5 justify-center items-center">
          <Avatar isBordered radius="full" size="md" src={avatar_src} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
              <h5 className="text-small tracking-tight text-default-400">Pro</h5>
            </div>
            <Button
              className={isLogIn ? "bg-transparent text-foreground border-default-200" : ""}
              color="primary"
              radius="full"
              size="sm"
              variant={isLogIn ? "bordered" : "solid"}
        onPress={() => onPress(!isLogIn)}
            >
            {isLogIn ? "Sign Off" : "Login"}
          </Button>
        </div>
    )
}