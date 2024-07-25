import "~style.css"
import { useReducer } from "react"
import {Select, SelectItem, Card, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {animals} from "./data.ts"

function IndexPopup() {
  return (
    <div className="h-[492px] w-[316px]">
      <Card className="flex mt-4 items-center ">
      <Select
        items={animals}
        label="Favorite Animal"
        placeholder="Select an animal"
        className="pt-2 pr-6 pb-6 pl-4 h-[55px] w-full"
      >
        {(animal) => <SelectItem>{animal.label}</SelectItem>}
      </Select>
        <Image
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IkZyYW1lIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTguNzEwMjMgMTMuMzg3NkwxMy4yODkzIDguODA4NkwxNC4wOTc3IDguMDAwMjJMMTMuMjg5NyA3LjE5MjIyTDguNzEwMjMgMi42MTI3OUw3LjkwMjIzIDMuNDIwNzlMMTEuOTA5NSA3LjQyODc5SDEuOTA1NjZWOC41NzE2NUgxMS45MDk1TDcuOTAxODUgMTIuNTc5M0w4LjcxMDIzIDEzLjM4NzZaIiBmaWxsPSIjODM4MzgzIi8+CjwvZz4KPC9zdmc+Cg=="
          className="mx-2" />
        <Select
      items={animals}
      label="Favorite Animal"
      placeholder="Select an animal"
      className="pt-2 pr-6 pb-6 pl-4 h-[55px] w-full"
    >
      {(animal) => <SelectItem>{animal.label}</SelectItem>}
        </Select> 
        
      </Card>
     
    </div>
  )
}

export default IndexPopup