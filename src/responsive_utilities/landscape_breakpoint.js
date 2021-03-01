import React from 'react'
import Breakpoint from './breakpoints'
export default function DesktopBreakpoint(props) {
	return (
		<Breakpoint name='landscape'>
			{props.children}
		</Breakpoint>
	)
}
