import React, { FC } from 'react'

import { IoTrashOutline, IoPencil, IoSkull } from 'react-icons/io5'

import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { deletePackTC, editPackTC } from 'features/packs/packsSlice'

export const PacksAction: FC<PackListActionType> = ({ user_id, pack_id }) => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.auth.user._id)

  const removePack = () => {
    dispatch(deletePackTC(pack_id))
  }

  const editPack = (name: string) => {
    dispatch(editPackTC({ name, _id: pack_id }))
  }

  return (
    <>
      {user_id === myId ? (
        <>
          <IoSkull />
          <IoPencil onClick={() => editPack('Warszawa')} />
          <IoTrashOutline onClick={removePack} />
        </>
      ) : (
        <>
          <IoSkull />
        </>
      )}
    </>
  )
}

type PackListActionType = {
  user_id: string
  pack_id: string
}
