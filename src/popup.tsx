import "~style.css"
import { useEffect, useState } from "react"
import {Select, SelectItem, Card, CardFooter,CardHeader, CardBody, Divider, Link, Image,Avatar,Button} from "@nextui-org/react";
import {lan} from "./lan"
import React from "react";

import {Header} from "./component/customerHeader/index"


function get_basic_info()  {
  var manifest = chrome.runtime.getManifest();
  var name = manifest.name;
  var version = manifest.version;
  var iconUrl = chrome.runtime.getURL(chrome.runtime.getManifest().icons[16]);

  return {
    "name": name,
    "version": version,
    "iconURL": iconUrl
  }
}


function IndexPopup() {
  const [source_label, setValueSourceLable] = useState("");

  var basic_info = get_basic_info() 

  const browserLanguage = navigator.language;
  var sourceDefaultKey = "";
  var targetDefaultKey = "en";
 
  var sourceDefaultKey = browserLanguage.replace("-", "_");
  
  const handleSelectionChange = () => {
    setValueSourceLable("Source")
  }

  React.useEffect(() => {
    if (chrome.i18n.getMessage(`locale_${sourceDefaultKey}`)) {
      setValueSourceLable("Auto Detect");
    } else {
      setValueSourceLable("Source");
    }

    return () => {
    };
  }, []);
  

  return (
    <div className="h-[492px] w-[323px]">

      <Card className="w-full h-full">
        <CardHeader className="flex gap-3">
          <Header />
        </CardHeader>
        <Divider/>
          <CardBody>
            <div className="h-[63px] flex w-full justify-center items-center">
              <Select
              items={lan}
              label={source_label}
              placeholder="Choose Source Language"
              className="h-[55px] flex-auto max-w-[45%]"
              fullWidth={false}
              defaultSelectedKeys={[sourceDefaultKey]}
              onSelectionChange={handleSelectionChange}
              disallowEmptySelection={true}
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
                label="Target"
                placeholder="Choose Target Language"
                className="h-[55px] flex-auto max-w-[45%]"
                defaultSelectedKeys={[targetDefaultKey]}
                disallowEmptySelection={true}
              >
                {(lan) => <SelectItem key={lan.key}>{lan.label}</SelectItem>}
              </Select> 
            </div>
        
        </CardBody>
        <Divider/>
        <CardFooter>
          
          <div className="flex flex-col">
              <p className="text-md">{basic_info.name} {basic_info.version}</p>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/garethng/ai-input-translate"
              >
              Visit source code on GitHub.
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default IndexPopup