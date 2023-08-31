import {memo, useCallback} from 'react'
import {classNames} from '@/shared/lib/classNames/classNames'
import cls from './AddCommentForm.module.scss'
import {Input} from '@/shared/ui/Input'
import {useTranslation} from 'react-i18next'
import {Button} from '@/shared/ui/Button'
import {useSelector} from 'react-redux'
import {getCommentFormText} from '../../model/selectors/getCommentFormState'
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {addCommentFormActions, addCommentFormReducer} from '../../model/slice/addCommentFormSlice'
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo(({className, onSendComment}: AddCommentFormProps) => {
  const {t} = useTranslation()
  const text = useSelector(getCommentFormText)
  const dispatch = useAppDispatch()

  const onTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onTextChange('')
  }, [onSendComment, onTextChange, text])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div
        className={classNames(cls.AddCommentForm, {}, [className])}
        data-testid="AddCommentForm"
      >
        <Input
          className={cls.input}
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onTextChange}
          data-testid="AddCommentForm.Input"
        />
        <Button
          onClick={onSendHandler}
          data-testid="AddCommentForm.Button"
        >
          {t('Отправить')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
