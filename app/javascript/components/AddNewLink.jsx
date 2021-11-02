import React from 'react'
import { Button } from '@material-ui/core'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from 'react-modal'
import { useState } from 'react'
import './styles/AddNewLink.css'
import CreateForm from './CreateForm'

function AddNewLink(props) {
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleUpdate = () => {
    props.handleUpdate()
  }

  const handleReset = () => {
    props.handleReset()
  }

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpenModal}
        style={{ width: "100%" }}>Create New Link</Button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
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
        <CreateForm
          handleCloseModal={handleCloseModal}
          handleUpdate={handleUpdate}
          handleReset={handleReset} />
        {/* <Button onClick={handleCloseModal}>close</Button> */}
      </Modal>
    </div>
  )
}

export default AddNewLink
