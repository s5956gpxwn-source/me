import SwiftUI

@MainActor
final class DurationViewModel: ObservableObject {

    @Published var startDate: DateValue
    @Published var endDate: DateValue
    @Published var inputSystem: CalendarSystem = .gregorian
    @Published var result: DurationResult?

    init() {
        let today = DateCalculator.today(in: .gregorian)
        startDate = today
        endDate   = today
    }

    func calculate(countMode: DurationCountMode) {
        result = DateCalculator.calculateDuration(
            from: startDate,
            to: endDate,
            countMode: countMode
        )
    }

    func updateStart(day: Int? = nil, month: Int? = nil, year: Int? = nil) {
        startDate = updated(startDate, day: day, month: month, year: year)
    }

    func updateEnd(day: Int? = nil, month: Int? = nil, year: Int? = nil) {
        endDate = updated(endDate, day: day, month: month, year: year)
    }

    func switchSystem(_ system: CalendarSystem, countMode: DurationCountMode) {
        guard system != inputSystem else { return }
        if let s = startDate.converted(to: system) { startDate = s }
        if let e = endDate.converted(to: system)   { endDate   = e }
        inputSystem = system
        calculate(countMode: countMode)
    }

    func swapDates(countMode: DurationCountMode) {
        swap(&startDate, &endDate)
        calculate(countMode: countMode)
    }

    private func updated(_ base: DateValue, day: Int?, month: Int?, year: Int?) -> DateValue {
        var v = base
        if let d = day   { v.day   = d }
        if let m = month { v.month = m }
        if let y = year  { v.year  = y }
        return v.clampedDay()
    }
}
