// 날짜 포멧팅 Hook
import { useMemo } from 'react'

const useFormatDate = (dateString) => {
    return useMemo(() => {
        if (!dateString) return ''
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${year}.${month}.${day} ${hours}:${minutes}`
    }, [dateString])
}

export default useFormatDate