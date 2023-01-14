export interface ISectionProps {
    onSubmit: Function,
    endText: string,
    onConfirm: any
}

export interface IDropdownProps {
    handleChange: Function,
    defaultLabel: string,
    label: string,
    value: string,
    items: any[]
}

export interface IRadioGroup {
    onChangeValue: Function,
    label?: string,
    choices: any[],
    title: string
}

export interface IStepperProps {
    activeStep: number
    error?: boolean
}

export interface ITableProps {
    rows: any[]
}