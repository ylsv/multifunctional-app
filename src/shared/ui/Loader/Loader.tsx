import {classNames} from 'shared/lib/classNames/classNames'
import './Loader.scss'

interface LoaderProps {
  className?: string
}
// https://loading.io/css/

export const Loader = ({className}: LoaderProps) => {
  return (
    <div className={classNames('lds-grid', {}, [className])}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
