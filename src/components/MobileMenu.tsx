"use client"

import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link"
import { Fragment } from "react"
import { IoClose } from "react-icons/io5"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex items-center justify-between px-4 py-6">
                      <Dialog.Title className="text-lg font-semibold">
                        Menu
                      </Dialog.Title>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setIsOpen(false)}
                      >
                        <IoClose className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-4 px-4">
                      <Link
                        href="/business-cards"
                        className="text-lg hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Business Cards
                      </Link>
                      <Link
                        href="/postcards"
                        className="text-lg hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Postcards
                      </Link>
                      <Link
                        href="/stationery"
                        className="text-lg hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Stationery
                      </Link>
                      <Link
                        href="/faq"
                        className="text-lg hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Help & FAQs
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
