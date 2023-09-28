import Link from "next/link";
import { DotsVertical, Logo, Search } from "./icons/Icons";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useState, Fragment } from "react";
import router from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserImage } from "./Components";
import { Button } from "./buttons/Buttons";
interface NavbarProps {
  children: JSX.Element;
}

interface NavigationItem {
  icon: (classnName: string) => JSX.Element;
  name: string;
  path: string;
  lineAbove: boolean;
}

export default function Navbar({ children }: NavbarProps) {
  const [searchInput, setSearchInput] = useState("");
  const { data: sessionData } = useSession();
  const handleSearch = async () => {
    console.log(searchInput);
    try {
      await router.push({
        pathname: "/SearchPage",
        query: { q: searchInput },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void handleSearch();
    }
  };

  return (
    <>
      <div className="fixed z-50 w-full border border-gray-200 bg-white shadow-sm lg:overflow-y-visible">
        <div className="mx-auto flex max-w-full px-6 lg:px-16 xl:grid xl:grid-cols-12">
          <div className="flex flex-shrink-0 items-center lg:static xl:col-span-2">
            <Link href="#" aria-label="none">
              <Logo className="h-10" />
            </Link>
          </div>
          <div className="w-full min-w-0 flex-1 bg-red-400 lg:px-0 xl:col-span-8">
            <div className="flex items-center px-6 py-4 lg:max-w-none xl:mx-0">
              <label htmlFor="searech" className="sr-only w-full">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="focus:ring-primary-500 block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 "
                  placeholder="Search"
                  type="search"
                  onChange={(e: ChangeEvent) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center lg:hidden">{children}</div>
          <div className="m-0 hidden w-max px-0 lg:flex lg:items-center lg:justify-end xl:col-span-2">
            <Menu as="div" className="relative ml-5 flex-shrink-0">
              <div>
                <Menu.Button className="focus:ring-primary-500 flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2">
                  {sessionData ? (
                    <UserImage image={sessionData?.user.image ?? ""} />
                  ) : (
                    <DotsVertical className="w-5 stroke-gray-700" />
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {sessionData ? (
                    <div className="mx-4 my-2 flex">
                      <UserImage image={sessionData?.user.image ?? ""} />
                      <div className="ml-2 flex w-full flex-col justify-start truncate ">
                        <p className="truncate text-sm font-semibold text-gray-700">
                          {sessionData && <span>{sessionData.user?.name}</span>}
                        </p>
                        <p className=" truncate text-sm text-gray-600">
                          {sessionData && (
                            <span className="">{sessionData.user?.email}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mx-4 my-2 flex text-center text-sm font-semibold text-gray-700 ">
                      Menu
                    </p>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
            {/*Sign up login buttons*/}
            {sessionData ? (
              ""
            ) : (
              <div className="flex flex-row space-x-3 ">
                <Button
                  variant="tertiary-gray"
                  size="md"
                  onClick={!sessionData ? () => void signIn() : () => ""}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={!sessionData ? () => void signIn() : () => ""}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
