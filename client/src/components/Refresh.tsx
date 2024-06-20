import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineArrowPath } from 'react-icons/hi2'
import { LINK_BUTTON_CLASSES } from '../constants/classes.constants'
import useDispatchActions from '../hooks/useDispatchActions'
import useNotify from '../hooks/useNotify'

interface RefreshProps {
  className?: string
}

const Refresh: FC<RefreshProps> = ({ className = '' }) => {
  const { userActions } = useDispatchActions()
  const { t } = useTranslation()
  const [isRefreshed, setIsRefreshed] = useState(true)
  const { notify } = useNotify()
  const handleClick = () => {
    setIsRefreshed(false)
    const timeout = () =>
      setTimeout(() => {
        setIsRefreshed(true)
        notify(t('Successfully refreshed the data!'))
      }, 1000)
    userActions.fetch(timeout)
  }
  return (
    <button
      className={`${LINK_BUTTON_CLASSES.sm} text-xl ${className}`}
      onClick={handleClick}
    >
      {!isRefreshed && <HiOutlineArrowPath />}
    </button>
  )
}

export default Refresh
