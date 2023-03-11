import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import { AppSwatch } from '@src/styles'

export default function CheckIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon sx={{ width: 24, height: 24, color: AppSwatch.Dark.Blue[50] }} {...props}>
      <path d='M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
    </SvgIcon>
  )
}
