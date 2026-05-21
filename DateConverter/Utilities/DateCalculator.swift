import Foundation

struct DateCalculator {

    // MARK: - Convert

    static func convert(_ value: DateValue, to target: CalendarSystem) -> DateValue? {
        value.converted(to: target)
    }

    // MARK: - Age

    static func calculateAge(
        birthDate: DateValue,
        toDate referenceDate: DateValue? = nil
    ) -> AgeResult? {
        let gregorian = Calendar(identifier: .gregorian)

        guard let birth = birthDate.converted(to: .gregorian)?.toDate() else { return nil }

        let reference: Date
        if let ref = referenceDate?.converted(to: .gregorian)?.toDate() {
            reference = ref
        } else {
            reference = Date()
        }

        guard reference >= birth else { return nil }

        let comps = gregorian.dateComponents([.year, .month, .day], from: birth, to: reference)
        let years  = comps.year  ?? 0
        let months = comps.month ?? 0
        let days   = comps.day   ?? 0

        let gregRef = DateValue.fromDate(reference, system: .gregorian)
        let hijriRef = DateValue.fromDate(reference, system: .hijri)

        return AgeResult(
            years: years, months: months, days: days,
            gregorianDate: gregRef, hijriDate: hijriRef
        )
    }

    // MARK: - Duration

    static func calculateDuration(
        from start: DateValue,
        to end: DateValue,
        countMode: DurationCountMode
    ) -> DurationResult? {
        let gregorian = Calendar(identifier: .gregorian)

        guard
            let startDate = start.converted(to: .gregorian)?.toDate(),
            let endDate   = end.converted(to: .gregorian)?.toDate()
        else { return nil }

        let (earlier, later) = startDate <= endDate ? (startDate, endDate) : (endDate, startDate)

        let comps    = gregorian.dateComponents([.year, .month, .day], from: earlier, to: later)
        let rawTotal = gregorian.dateComponents([.day], from: earlier, to: later).day ?? 0
        let total    = rawTotal + countMode.adjustment

        return DurationResult(
            years:     comps.year  ?? 0,
            months:    comps.month ?? 0,
            days:      comps.day   ?? 0,
            totalDays: max(0, total)
        )
    }

    // MARK: - Today

    static func today(in system: CalendarSystem) -> DateValue {
        DateValue.fromDate(Date(), system: system)
    }

    // MARK: - Validate

    static func isValid(_ value: DateValue) -> Bool {
        value.toDate() != nil
    }
}
