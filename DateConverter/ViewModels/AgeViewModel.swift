import SwiftUI

@MainActor
final class AgeViewModel: ObservableObject {

    @Published var birthDate: DateValue
    @Published var inputSystem: CalendarSystem = .gregorian
    @Published var result: AgeResult?

    init() {
        birthDate = DateCalculator.today(in: .gregorian)
    }

    func calculate() {
        result = DateCalculator.calculateAge(birthDate: birthDate)
    }

    func updateBirth(day: Int? = nil, month: Int? = nil, year: Int? = nil) {
        var updated = birthDate
        if let d = day   { updated.day   = d }
        if let m = month { updated.month = m }
        if let y = year  { updated.year  = y }
        updated = updated.clampedDay()
        birthDate = updated
        calculate()
    }

    func switchSystem(_ system: CalendarSystem) {
        guard system != inputSystem else { return }
        if let converted = birthDate.converted(to: system) {
            birthDate = converted
        }
        inputSystem = system
        calculate()
    }
}
