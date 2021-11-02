import React, { useState } from 'react'
import { Modal } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import CreateForm from '../CreateForm'

export default function CustomModal(props) {
  const { children, ...other } = props

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.handleCloseModal}
      style={{
        content: {
          top: '15%',
          left: '15%',
          right: '15%',
          bottom: '15%',
          overflow: 'hidden',
          borderRadius: '8px'
        },
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)'
        }
      }}
    >
      <>
        <AnimatePresence>
          <motion.div
            key="content"
            initial={{
              x: 100,
              opacity: 0
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.3,
                duration: 0.3
              }
            }}
            exit={{
              x: 100,
              opacity: 0,
              transition: {
                duration: 0.3
              }
            }}
          >
            <h2 id="title">Add New Link</h2>
            <form id="inputField">
              <div id="inputField">

              </div>
            </form>

          </motion.div>
        </AnimatePresence>
        {children}
      </>
    </Modal>
  )
}
