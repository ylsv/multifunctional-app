import {memo, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {classNames} from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import {useTranslation} from 'react-i18next'
import {Button, ButtonTheme} from 'shared/ui/Button/Button'
import {Input} from 'shared/ui/Input/Input'
import {loginActions} from '../../model/slice/loginSlice'
import {getLoginState} from '../../model/selectors/getLoginState/getLoginState'
import {loginByUsername} from '../../model/services/loginByUsername/loginByUsername'
import {Text, TextTheme} from 'shared/ui/Text/Text'

interface LoginFormProps {
  className?: string
  isOpen?: boolean
}

export const LoginForm = memo(({className, isOpen}: LoginFormProps) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const {username, password, error, isLoading} = useSelector(getLoginState)

  const onChangeUsername = useCallback(
    (value: string) => dispatch(loginActions.setUsername(value)),
    [dispatch])

  const onChangePassword = useCallback(
    (value: string) => dispatch(loginActions.setPassword(value)),
    [dispatch])

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({username, password}))
  }, [dispatch, password, username])

  const handleSubmit = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') onLoginClick()
  }, [onLoginClick])

  useEffect(() => {
    if (!isOpen) dispatch(loginActions.clearError())
    if (isOpen) document.addEventListener('keydown', handleSubmit)
    return () => {
      document.removeEventListener('keydown', handleSubmit)
    }
  }, [isOpen, dispatch, handleSubmit])

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('Форма авторизации')}/>
      {error && <Text text={t('неверный логин или пароль')} theme={TextTheme.ERROR} className={cls.error}/>}
      <Input
        type="text"
        className={cls.input}
        placeholder={t('логин')}
        autoFocus
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        className={cls.input}
        placeholder={t('пароль')}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        className={cls.loginBtn}
        theme={ButtonTheme.OUTLINE}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  )
})
