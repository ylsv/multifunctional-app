import {classNames} from '@/shared/lib/classNames/classNames'
import {Page} from '@/widgets/Page'
import {EditableProfileCard} from '@/features/EditableProfileCard'
import {useParams} from 'react-router-dom'


const ProfilePage = () => {
  let {id} = useParams<{ id: string }>()
  if (__PROJECT__ === 'storybook') id = '1'
  return (
    <Page className={classNames('', {}, [])}>
      <EditableProfileCard id={id}/>
    </Page>
  )
}

export default ProfilePage
