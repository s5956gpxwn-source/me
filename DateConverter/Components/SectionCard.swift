import SwiftUI

/// Reusable container card with optional header
struct SectionCard<Content: View>: View {

    var title: String = ""
    var icon: String  = ""
    var accent: Color = .appPrimary
    @ViewBuilder let content: () -> Content

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if !title.isEmpty {
                Label(title, systemImage: icon)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(accent)
            }
            content()
        }
        .padding(16)
        .background(
            RoundedRectangle(cornerRadius: 20, style: .continuous)
                .fill(Color.cardBackground)
                .shadow(color: .black.opacity(0.06), radius: 8, x: 0, y: 3)
        )
    }
}

// MARK: - Calendar Toggle

struct CalendarToggle: View {
    @Binding var selected: CalendarSystem

    var body: some View {
        HStack(spacing: 0) {
            toggleButton(.hijri,      label: String(localized: "calendar.hijri"))
            toggleButton(.gregorian,  label: String(localized: "calendar.gregorian"))
        }
        .background(
            Capsule().fill(Color.primary.opacity(0.07))
        )
    }

    private func toggleButton(_ system: CalendarSystem, label: String) -> some View {
        Button {
            withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) {
                selected = system
            }
        } label: {
            Text(label)
                .font(.subheadline.weight(.medium))
                .padding(.vertical, 8)
                .padding(.horizontal, 20)
                .background(
                    Group {
                        if selected == system {
                            Capsule()
                                .fill(Color.appPrimary)
                                .transition(.scale.combined(with: .opacity))
                        }
                    }
                )
                .foregroundStyle(selected == system ? .white : .secondary)
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Color Tokens

extension Color {
    static let appPrimary    = Color("AppPrimary",    bundle: .main)
    static let appSecondary  = Color("AppSecondary",  bundle: .main)
    static let appBackground = Color("AppBackground", bundle: .main)
    static let cardBackground = Color("CardBackground", bundle: .main)
}
