import SwiftUI
import Combine

@MainActor
final class ConverterViewModel: ObservableObject {

    @Published var input: DateValue
    @Published var result: DateValue?
    @Published var direction: ConversionDirection = .hijriToGregorian

    enum ConversionDirection {
        case hijriToGregorian
        case gregorianToHijri

        mutating func toggle() {
            self = self == .hijriToGregorian ? .gregorianToHijri : .hijriToGregorian
        }

        var inputSystem: CalendarSystem {
            self == .hijriToGregorian ? .hijri : .gregorian
        }
        var outputSystem: CalendarSystem {
            self == .hijriToGregorian ? .gregorian : .hijri
        }
    }

    init(defaultSystem: CalendarSystem) {
        let today = DateCalculator.today(in: defaultSystem == .gregorian ? .gregorian : .hijri)
        input = today
        direction = defaultSystem == .gregorian ? .gregorianToHijri : .hijriToGregorian
        convert()
    }

    func convert() {
        result = DateCalculator.convert(input, to: direction.outputSystem)
    }

    func flip() {
        if let r = result {
            input = r
        }
        direction.toggle()
        convert()
    }

    func setToday() {
        input = DateCalculator.today(in: direction.inputSystem)
        convert()
    }

    func updateInput(day: Int? = nil, month: Int? = nil, year: Int? = nil) {
        var updated = input
        if let d = day   { updated.day   = d }
        if let m = month { updated.month = m }
        if let y = year  { updated.year  = y }
        updated = updated.clampedDay()
        input = updated
        convert()
    }
}
