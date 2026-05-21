import Foundation

// MARK: - Calendar Type

enum CalendarSystem: String, CaseIterable, Codable {
    case hijri = "hijri"
    case gregorian = "gregorian"

    var calendar: Calendar {
        switch self {
        case .hijri: return Calendar(identifier: .islamicUmmAlQura)
        case .gregorian: return Calendar(identifier: .gregorian)
        }
    }

    var yearRange: ClosedRange<Int> {
        switch self {
        case .hijri: return 1300...1500
        case .gregorian: return 1900...2100
        }
    }

    var suffix: String {
        switch self {
        case .hijri: return "هـ"
        case .gregorian: return "م"
        }
    }
}

// MARK: - Hijri Months

enum HijriMonth: Int, CaseIterable {
    case muharram = 1, safar, rabiAlAwwal, rabiAlThani
    case jumadaAlUla, jumadaAlThania, rajab, shaban
    case ramadan, shawwal, dhuAlQida, dhuAlHijja

    var localizedName: String {
        switch self {
        case .muharram:      return String(localized: "month.hijri.muharram")
        case .safar:         return String(localized: "month.hijri.safar")
        case .rabiAlAwwal:   return String(localized: "month.hijri.rabi1")
        case .rabiAlThani:   return String(localized: "month.hijri.rabi2")
        case .jumadaAlUla:   return String(localized: "month.hijri.jumada1")
        case .jumadaAlThania:return String(localized: "month.hijri.jumada2")
        case .rajab:         return String(localized: "month.hijri.rajab")
        case .shaban:        return String(localized: "month.hijri.shaban")
        case .ramadan:       return String(localized: "month.hijri.ramadan")
        case .shawwal:       return String(localized: "month.hijri.shawwal")
        case .dhuAlQida:     return String(localized: "month.hijri.dhulqida")
        case .dhuAlHijja:    return String(localized: "month.hijri.dhulhijja")
        }
    }
}

// MARK: - DateValue

struct DateValue: Equatable {
    var day: Int
    var month: Int
    var year: Int
    var system: CalendarSystem

    // MARK: Derived

    func toDate() -> Date? {
        var comps = DateComponents()
        comps.day = day
        comps.month = month
        comps.year = year
        return system.calendar.date(from: comps)
    }

    static func fromDate(_ date: Date, system: CalendarSystem) -> DateValue {
        let comps = system.calendar.dateComponents([.year, .month, .day], from: date)
        return DateValue(
            day: comps.day ?? 1,
            month: comps.month ?? 1,
            year: comps.year ?? (system == .hijri ? 1446 : 2024),
            system: system
        )
    }

    func converted(to target: CalendarSystem) -> DateValue? {
        guard let date = toDate() else { return nil }
        return DateValue.fromDate(date, system: target)
    }

    // Max days in the current month/year
    var maxDaysInMonth: Int {
        guard let date = toDate() else { return 30 }
        return system.calendar.range(of: .day, in: .month, for: date)?.count ?? 30
    }

    // Clamped day if month/year changed
    func clampedDay() -> DateValue {
        let maxD = maxDaysInMonth
        return DateValue(day: min(day, maxD), month: month, year: year, system: system)
    }

    // MARK: Display

    func monthName() -> String {
        if system == .hijri {
            return HijriMonth(rawValue: month)?.localizedName ?? "\(month)"
        } else {
            let formatter = DateFormatter()
            formatter.locale = Locale.current
            return formatter.monthSymbols[month - 1]
        }
    }

    /// e.g. "٢١ / مايو ٥ / ٢٠٢٦ م"
    func formatted(numberStyle: NumberStyle) -> String {
        let d = numberStyle.format(day)
        let m = numberStyle.format(month)
        let y = numberStyle.format(year)
        return "\(d) / \(monthName()) \(m) / \(y) \(system.suffix)"
    }
}

// MARK: - Duration Result

struct DurationResult {
    let years: Int
    let months: Int
    let days: Int
    let totalDays: Int

    func formatted(numberStyle: NumberStyle) -> String {
        let y = numberStyle.format(years)
        let m = numberStyle.format(months)
        let d = numberStyle.format(days)
        let t = numberStyle.format(totalDays)

        if years == 0 && months == 0 {
            return String(format: String(localized: "duration.days_only"), d)
        } else if years == 0 {
            return String(format: String(localized: "duration.months_days"), m, d)
        }
        return String(format: String(localized: "duration.years_months_days"), y, m, d) + "\n" +
               String(format: String(localized: "duration.total_days"), t)
    }
}

// MARK: - Age Result

struct AgeResult {
    let years: Int
    let months: Int
    let days: Int

    var gregorianDate: DateValue
    var hijriDate: DateValue

    func formatted(numberStyle: NumberStyle) -> String {
        let y = numberStyle.format(years)
        let m = numberStyle.format(months)
        let d = numberStyle.format(days)
        return String(format: String(localized: "age.result_format"), y, m, d)
    }
}

// MARK: - Number Style

enum NumberStyle: String, CaseIterable {
    case arabic = "arabic"
    case western = "western"

    func format(_ n: Int) -> String {
        if self == .arabic {
            let formatter = NumberFormatter()
            formatter.locale = Locale(identifier: "ar")
            return formatter.string(from: NSNumber(value: n)) ?? "\(n)"
        }
        return "\(n)"
    }
}

// MARK: - Duration Count Mode

enum DurationCountMode: String, CaseIterable {
    case both      = "both"       // يحسب البداية والنهاية
    case startOnly = "startOnly"  // يحسب البداية فقط
    case endOnly   = "endOnly"    // يحسب النهاية فقط
    case neither   = "neither"    // لا يحسب لا البداية ولا النهاية

    var adjustment: Int {
        switch self {
        case .both:      return 1
        case .startOnly: return 0
        case .endOnly:   return 0
        case .neither:   return -1
        }
    }

    var localizedName: String {
        switch self {
        case .both:      return String(localized: "settings.count_both")
        case .startOnly: return String(localized: "settings.count_start")
        case .endOnly:   return String(localized: "settings.count_end")
        case .neither:   return String(localized: "settings.count_neither")
        }
    }
}
