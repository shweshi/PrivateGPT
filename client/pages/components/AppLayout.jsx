import { Disclosure, Menu, Transition } from "@headlessui/react";
import NewFileUpload from "./NewFileUpload";
import AppHeader from "./AppHeader";

export default function AppLayout(props) {
  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <Disclosure>
          <div
            id="sidebar"
            className="bg-[#191a23] pl-4 pr-4  w-1/4 border-r hidden md:block  pt-5 border-gray-100 dark:border-gray-600 shadow-none sticky top-0"
          >
            <div
              className="w-full h-full hidden md:flex"
              data-projection-id="21"
            >
              <div className="w-full h-full flex flex-col ">
                <div className="flex justify-between items-center "></div>
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex flex-col">
                    <Disclosure.Button>
                      <NewFileUpload />
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Disclosure>

        <div className="flex flex-grow flex-col md:flex-row w-full overflow-y-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
}
