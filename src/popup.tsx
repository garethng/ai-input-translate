import "~style.css"
import { useEffect, useState } from "react"
import {Select, SelectItem, Card, CardFooter,CardHeader, CardBody, Divider, Link, Image,Avatar,Button} from "@nextui-org/react";
import {lan} from "./lan"
import React from "react";

import {Header} from "./component/customerHeader/index"
import { useStorage } from "@plasmohq/storage/hook"

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

  const [target_lan, setSourceLanValue] = useStorage("target_lan")

  var basic_info = get_basic_info() 
 
  
  function handleSourceSelectionChange(keys: { anchorKey?: string; currentKey?: string }) {
    setSourceLanValue(keys.currentKey)
  }

  useEffect(() => {
    
  }, [target_lan]);

  return (
    <div className="h-[492px] w-[323px]">

      <Card className="w-full h-full">
        <CardHeader className="flex gap-3">
          <Header />
        </CardHeader>
        <Divider/>
          <CardBody>
          <Select
              items={lan}
              label="Target Language"
              placeholder="Choose Source Language"
              className="h-[55px] flex-auto w-full"
              fullWidth={false}
              selectedKeys={[target_lan]}
              scrollShadowProps={{
                isEnabled: false
              }}
              onSelectionChange={handleSourceSelectionChange}
              disallowEmptySelection={true}
              >
                {(lan) => <SelectItem key={lan.key}>{lan.label}</SelectItem>}
              </Select>
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