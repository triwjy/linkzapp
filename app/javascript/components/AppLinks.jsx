import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, MenuItem, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import { motion, AnimatePresence } from 'framer-motion'
import Modal from 'react-modal'
import EditForm from './EditForm';

// list
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

// ==========================================================
const AppLinks = (props) => {
  const classes = useStyles();

  const [applinks, setApplinks] = useState([])
  const [selected, setSelected] = useState('')
  const [currentValues, setCurrentValues] = useState({})
  const [hover, setHover] = useState(false)

  // update list everytime new crud
  useEffect(() => {
    axios.get('api/v1/linkapps.json')
      .then(resp => {
        setApplinks(resp.data.data)
      })
      .catch(resp => console.log(resp))
  }, [props.is_update])

  const handleSelectLink = (item) => {
    props.getValues(item)
    props.handleShowInformation()
  }

  // Menu ==================================================
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    const valuesData = document.getElementById(event.currentTarget.id)
    setCurrentValues({
      name: valuesData.dataset.name,
      hyperlink: valuesData.dataset.hyperlink,
      description: valuesData.dataset.description
    })
    setSelected(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleOpenLink = () => {
    const elements = applinks.filter((el) => {
      return el.id == selected
    })
    setAnchorEl(null);
    window.open(`http://${elements[0].attributes.hyperlink}`, '_blank');
  };

  const handleDeleteLink = () => {
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    axios.delete(`/api/v1/linkapps/${selected}.json`)
      .then(resp => {
        setAnchorEl(null);
        props.handleUpdate()
        props.handleReset()
      })
      .catch(resp => console.log(resp))

  }
  // Modal ========================================================
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setAnchorEl(null);
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleUpdate = () => {
    props.handleUpdate()
  }

  const handleReset = () => { props.handleReset() }
  const handleShowInformation = () => { props.handleShowInformation() }

  // ============================================================
  return (
    <div className="app-links">
      {applinks.map(item => (
        <div
          key={item.attributes.name}
        >
          <Menu
            id={`basic-menu-${item.attributes.name}`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': `${item.attributes.name}`,
            }}
          >
            <MenuItem onClick={handleOpenLink}>Open</MenuItem>
            <MenuItem onClick={handleOpenModal}>Edit</MenuItem>
            <MenuItem onClick={() => {
              setAnchorEl(null)
              window.confirm("Are you sure you wish to delete this item?") &&
                handleDeleteLink()
            }
            }>Delete</MenuItem>
          </Menu>
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
                backgroundColor: 'rgba(0,0,0,0.4)'
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
                <h2 id="title">Edit Application Link</h2>
                <form id="inputField">
                  <div id="inputField">

                  </div>
                </form>

              </motion.div>
            </AnimatePresence>
            <EditForm
              handleCloseModal={handleCloseModal}
              handleUpdate={handleUpdate}
              currentValues={currentValues}
              selected={selected}
              handleReset={handleReset}
            />
          </Modal>

          <div className={classes.root}>
            <Divider />
            <List component="nav" aria-label="appList" >
              <ListItem button
                onClick={() => handleSelectLink(item.attributes)}
              >
                <ListItemText primary={item.attributes.name}
                  onMouseEnter={() => { setHover(true) }}
                  onMouseLeave={() => { setHover(false) }}

                />
                <div><MoreVertIcon
                  id={item.id}
                  data-name={item.attributes.name}
                  data-hyperlink={item.attributes.hyperlink}
                  data-description={item.attributes.description}
                  aria-controls={`basic-menu-${item.attributes.name}`}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                />
                </div>
              </ListItem>
            </List>
            <Divider />
          </div>
        </div>))
      }
    </div >
  )
}

export default AppLinks
