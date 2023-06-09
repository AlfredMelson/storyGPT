import React from 'react'

import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import IconButton from '@mui/material/IconButton'

import { VisibilityContext, slidingWindow, getItemsPos } from 'react-horizontal-scrolling-menu'

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode
  disabled: boolean
  onClick: VoidFunction
}) {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        right: '1%',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
        '&.MuiButtonBase-root': {
          backgroundColor: 'transparent',
          color: 'rgba(0, 0, 0, 0.5)',
        },
      }}>
      {children}
    </IconButton>
  )
}

export function LeftArrow() {
  const {
    items,
    visibleItems,
    getItemById,
    isFirstItemVisible,
    scrollToItem,
    visibleElements,
    initComplete,
  } = React.useContext(VisibilityContext)

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  )
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleElements])

  // NOTE: for center items
  const prevGroupItems = slidingWindow(items.toItemsKeys(), visibleItems).prev()
  const { center } = getItemsPos(prevGroupItems)
  const scrollPrevCentered = () => scrollToItem(getItemById(center), 'smooth', 'center')

  return (
    <Arrow disabled={disabled} onClick={scrollPrevCentered}>
      <ArrowCircleLeftOutlinedIcon />
    </Arrow>
  )
}

export function RightArrow() {
  const { getItemById, isLastItemVisible, items, scrollToItem, visibleItems, visibleElements } =
    React.useContext(VisibilityContext)

  const [disabled, setDisabled] = React.useState(!visibleElements.length && isLastItemVisible)
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleElements])

  // NOTE: for center items
  const nextGroupItems = slidingWindow(items.toItemsKeys(), visibleItems).next()
  const { center } = getItemsPos(nextGroupItems)
  const scrollNextCentered = () => scrollToItem(getItemById(center), 'smooth', 'center')

  return (
    <Arrow disabled={disabled} onClick={scrollNextCentered}>
      <ArrowCircleRightOutlinedIcon />
    </Arrow>
  )
}
