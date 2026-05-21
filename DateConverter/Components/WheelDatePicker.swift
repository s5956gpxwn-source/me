import SwiftUI

/// Three-wheel date picker (Day / Month / Year)
/// Automatically adjusts day count when month or year changes.
struct WheelDatePicker: View {

    @Binding var day: Int
    @Binding var month: Int
    @Binding var year: Int
    let system: CalendarSystem

    // MARK: - Body

    var body: some View {
        HStack(spacing: 0) {
            // ── Year ──────────────────────────────
            Picker("", selection: $year) {
                ForEach(system.yearRange, id: \.self) { y in
                    Text(formattedYear(y))
                        .tag(y)
                }
            }
            .pickerStyle(.wheel)
            .frame(maxWidth: .infinity)
            .clipped()

            divider

            // ── Month ─────────────────────────────
            Picker("", selection: $month) {
                ForEach(1...12, id: \.self) { m in
                    Text(monthLabel(m))
                        .tag(m)
                        .multilineTextAlignment(.center)
                }
            }
            .pickerStyle(.wheel)
            .frame(maxWidth: .infinity)
            .clipped()
            .onChange(of: month) { clampDay() }
            .onChange(of: year)  { clampDay() }

            divider

            // ── Day ───────────────────────────────
            Picker("", selection: $day) {
                ForEach(1...maxDays, id: \.self) { d in
                    Text(formatNum(d))
                        .tag(d)
                }
            }
            .pickerStyle(.wheel)
            .frame(maxWidth: 70)
            .clipped()
        }
        .frame(height: 160)
    }

    // MARK: - Helpers

    private var divider: some View {
        Rectangle()
            .fill(Color.primary.opacity(0.12))
            .frame(width: 1, height: 100)
    }

    private var maxDays: Int {
        let v = DateValue(day: day, month: month, year: year, system: system)
        return v.maxDaysInMonth
    }

    private func clampDay() {
        let max = maxDays
        if day > max { day = max }
    }

    private func monthLabel(_ m: Int) -> String {
        if system == .hijri {
            let name = HijriMonth(rawValue: m)?.localizedName ?? ""
            return "\(name)\n\(formatNum(m))"
        } else {
            let formatter = DateFormatter()
            formatter.locale = Locale.current
            let name = formatter.monthSymbols[m - 1]
            return "\(name)\n\(formatNum(m))"
        }
    }

    private func formattedYear(_ y: Int) -> String {
        "\(formatNum(y)) \(system.suffix)"
    }

    private func formatNum(_ n: Int) -> String {
        if Locale.current.language.languageCode?.identifier == "ar" {
            let f = NumberFormatter()
            f.locale = Locale(identifier: "ar")
            return f.string(from: NSNumber(value: n)) ?? "\(n)"
        }
        return "\(n)"
    }
}

// MARK: - Preview

#Preview {
    @Previewable @State var day   = 21
    @Previewable @State var month = 5
    @Previewable @State var year  = 2026
    WheelDatePicker(day: $day, month: $month, year: $year, system: .gregorian)
        .padding()
}
