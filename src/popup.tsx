import "~style.css"
import { useEffect, useState } from "react"
import {Select, SelectItem, Card, CardFooter,CardHeader, CardBody, Divider, Link, Image,Avatar,Button} from "@nextui-org/react";
import {lan, TRIGGER_BUTTON, service_name} from "./const"
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

const tb = TRIGGER_BUTTON
function IndexPopup() {

  const [target_lan, setSourceLanValue] = useStorage("target_lan")
  const [trigger_button, setTriggerButton] = useStorage("trigger_button")
  const [translate_engine, setTranslateEngine] = useStorage("translate_engine")
  const [desp, setDesp] = useState("")
  var basic_info = get_basic_info() 
  
  function handleSourceSelectionChange(keys: { anchorKey?: string; currentKey?: string }) {
    setSourceLanValue(keys.currentKey)
  }

  function handleSelectTriggerButton(keys: { anchorKey?: string; currentKey?: string }) {
    setTriggerButton(keys.currentKey)

    for (var i in [0,1,2,3]) {
      if (tb[i].key === keys.currentKey) {
        // setDesp(`Quickly press the ${tb[i].actual_value} bar 3 times to start translating.`)
        setDesp(`${chrome.i18n.getMessage("button_dsp",[tb[i].actual_value])}`)
      }
    }
  }

  function handlerTranslateEngine(keys: { anchorKey?: string; currentKey?: string }) {
    setTranslateEngine(keys.currentKey)
  }

  useEffect(() => {
    for (var i in [0,1,2,3]) {
      if (tb[i].key === trigger_button) {
        // setDesp(`Quickly press the ${tb[i].actual_value} bar 3 times to start translating.`)
        setDesp(chrome.i18n.getMessage("button_dsp",[tb[i].actual_value]))
      }
    }
  }, [target_lan, trigger_button, desp, translate_engine]);

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
          <Select
              items={TRIGGER_BUTTON}
              label="Trigger Button"
              className="h-[55px] flex-auto w-full"
              fullWidth={false}
              description={desp}
              selectedKeys={[trigger_button]}
              scrollShadowProps={{
                isEnabled: false
              }}
              onSelectionChange={handleSelectTriggerButton}
              disallowEmptySelection={true}
              >
                {(TRIGGER_BUTTON) => <SelectItem key={TRIGGER_BUTTON.key}>{TRIGGER_BUTTON.actual_value}</SelectItem>}
          </Select>
          <Select
              items={service_name}
              label="Translation Service"
              className="h-[55px] flex-auto w-full"
              fullWidth={false}
              selectedKeys={[translate_engine]}
              scrollShadowProps={{
                isEnabled: false
              }}
              onSelectionChange={handlerTranslateEngine}
              disallowEmptySelection={true}
              >
                {(service_name) => <SelectItem key={service_name.key}>{service_name.label}</SelectItem>}
          </Select>

        </CardBody>
        <Divider />
        
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