import h from 'helix-react/lib/html'
import {Component} from 'react'

type InputType = 'text' | 'number' | 'password' | 'email' | 'tel' | 'search' | 'date'

export interface TextFieldProps {
  type?: InputType
  label?: string
  placeholder?: string
  className?: string
  value?: any
  oninput?: (value: any) => any
  onchange?: (value: any) => any
  onblur?: (value: any) => any
  onfocus?: (event: any) => any
  disabled?: boolean
  autoFocus?: boolean
}

export default class TextField extends Component<TextFieldProps, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
    this.emitChange = this.emitChange.bind(this)
  }

  componentDidMount () {
    this.bindOnChangeEvent()
  }

  componentDidUpdate () {
    this.bindOnChangeEvent()
  }

  bindOnChangeEvent () {
    const input = this.refs.input as any
    input.removeEventListener('change', this.emitChange)
    input.addEventListener('change', this.emitChange)
  }

  componentWillReceiveProps (props: any) {
    if (this.state.value !== props.value) {
      this.setState({
        value: props.value,
      })
    }
  }

  onChange (e: React.FormEvent<HTMLInputElement>) {
    const value = (e.target as any).value
    this.setState({
      value,
    })
    if (this.props.oninput) {
      this.props.oninput(value)
    }
  }

  emitChange (e: any) {
    if (this.props.onchange) {
      const value = e.target.value
      this.props.onchange(value)
    }
  }

  render () {
    const {
      type = 'text',
      label = '',
      placeholder = '',
      className = '',
      onfocus = (value: any) => value,
      disabled = false,
      autoFocus = false,
    } = this.props
    return (
      <div className={className}>
        {label ? (
          <div className='fs-small'>{label}</div>
        ) : null}
        <input
          ref='input'
          className={`
            w-100 ph-3 pv-2 ba bc-grey-100 bra-2 bg-white
          `}
          autoFocus={autoFocus}
          type={type}
          placeholder={placeholder}
          value={this.state.value as any}
          onFocus={(e) => onfocus(e)}
          onChange={this.onChange}
          onBlur={this.props.onblur}
          disabled={disabled}
        />
      </div>
    )
  }
}
