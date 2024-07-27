import "~style.css"
import { useReducer } from "react"
import {Select, SelectItem, Card, CardFooter,CardHeader, CardBody, Divider, Link, Image} from "@nextui-org/react";
import {lan} from "./lan"

function IndexPopup() {
  const browserLanguage = navigator.language;
  var defaultKey = ""
  let source_label = "Source"
  console.log(browserLanguage)
  
  
  return (
    <div className="h-[492px] w-[323px]">

<Card className="w-full h-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
        <CardBody>
          <div className="h-[63px] flex w-full justify-center items-center">
            <Select
              items={lan}
              label={source_label}
              placeholder="Select an animal"
              className="h-[55px] flex-auto w-11/12"
              fullWidth={false}
              defaultSelectedKeys={[defaultKey]}
            >
              {(lan) => <SelectItem key={lan.key}>{lan.label}</SelectItem>}
            </Select>
            <div className="w-4 h-4">
            <Image
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkZyYW1lIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTguNzEwMjMgMTMuMzg3NkwxMy4yODkzIDguODA4NkwxNC4wOTc3IDguMDAwMjJMMTMuMjg5NyA3LjE5MjIyTDguNzEwMjMgMi42MTI3OUw3LjkwMjIzIDMuNDIwNzlMMTEuOTA5NSA3LjQyODc5SDEuOTA1NjZWOC41NzE2NUgxMS45MDk1TDcuOTAxODUgMTIuNTc5M0w4LjcxMDIzIDEzLjM4NzZaIiBmaWxsPSIjODM4MzgzIi8+CjwvZz4KPC9zdmc+Cg=="
                height={16}
                width={16}/>
            </div>
              
            <Select
              items={lan}
              label="Farget"
              placeholder="Select an animal"
              className="h-[55px] flex-auto w-11/12"
            >
              {(lan) => <SelectItem key={lan.key}>{lan.label}</SelectItem>}
            </Select> 
          </div>
      
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/garethng/ai-input-translate"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
      {/* <Card className="">
        <CardBody>
           

        </CardBody>
      
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div>
      </CardFooter>
      </Card> */}
    </div>
  )
}

export default IndexPopup