import SwiftUI

/// Displays a single date in the format: ٢١ / مايو ٥ / ٢٠٢٦ م
struct DateDisplayCard: View {

    let value: DateValue
    let numberStyle: NumberStyle
    var label: String = ""
    var accent: Color = .appPrimary

    var body: some View {
        VStack(alignment: .center, spacing: 6) {
            if !label.isEmpty {
                Text(label)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            HStack(alignment: .lastTextBaseline, spacing: 8) {
                // Day
                datePart(text: numberStyle.format(value.day), size: 36, weight: .bold)

                Text("/")
                    .font(.title2)
                    .foregroundStyle(.secondary)

                // Month name + number
                VStack(alignment: .center, spacing: 1) {
                    Text(value.monthName())
                        .font(.callout.weight(.semibold))
                        .foregroundStyle(accent)
                    Text(numberStyle.format(value.month))
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }

                Text("/")
                    .font(.title2)
                    .foregroundStyle(.secondary)

                // Year + suffix
                HStack(alignment: .lastTextBaseline, spacing: 3) {
                    datePart(text: numberStyle.format(value.year), size: 28, weight: .semibold)
                    Text(value.system.suffix)
                        .font(.caption.weight(.medium))
                        .foregroundStyle(accent)
                }
            }
        }
        .padding(.vertical, 14)
        .padding(.horizontal, 20)
        .frame(maxWidth: .infinity)
        .background(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(.ultraThinMaterial)
                .overlay(
                    RoundedRectangle(cornerRadius: 16, style: .continuous)
                        .strokeBorder(accent.opacity(0.25), lineWidth: 1)
                )
        )
    }

    private func datePart(text: String, size: CGFloat, weight: Font.Weight) -> some View {
        Text(text)
            .font(.system(size: size, weight: weight, design: .rounded))
            .foregroundStyle(.primary)
    }
}

#Preview {
    let v = DateValue(day: 21, month: 5, year: 2026, system: .gregorian)
    DateDisplayCard(value: v, numberStyle: .arabic, label: "الميلادي")
        .padding()
        .background(Color.appBackground)
}
