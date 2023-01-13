export const COLORS = {

    APP: {
        PRIMARY: '#EEEDE7'
    }

}


export const GENDERS = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]

export const TRANSPORT_CHOICES = [{ value: 'yes', label: "Yes"}, { value: 'no', label: "No, I prefer using other transport"}]

export const YES_NO_CHOICES = [{ value: 'yes', label: "Yes" }, { value: 'no', label: "No" }]

export const DRIVETRAIN_CHOICES = [{ value: 'FWD', label: "FWD" }, { value: 'RWD', label: "RWD" }, { value: 'IDK', label: "I don't know" }]

export const EMISSION_CHOICES = [{ value: 'yes', label: "Yes" }, { value: 'no', label: "No" }]

export const CAR_MAKES = [{ value: 'BMW', label: 'BMW' }, { value: 'mercedes', label: 'Mercedes' }, { value: 'toyota', label: 'Toyota' }, 
{ value: 'cadillac', label: 'Cadillac' }, { value: 'ford', label: 'Ford' }, { value: 'ferrari', label: 'Ferrari' }]

export const PATTERN_BMW_1 = /^m*[0-9]{3}[d|i]*$/i

export const PATTERN_BMW_2 = /^[x|z]{1}[0-9]{1}$/i
