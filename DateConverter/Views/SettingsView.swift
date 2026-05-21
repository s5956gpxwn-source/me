import SwiftUI

struct SettingsView: View {

    @EnvironmentObject private var settings: AppSettings

    var body: some View {
        List {

            // ── General ────────────────────────────────────────────────
            Section(String(localized: "settings.section.general")) {
                Picker(String(localized: "settings.default_calendar"), selection: $settings.defaultCalendar) {
                    Text(String(localized: "calendar.gregorian")).tag(CalendarSystem.gregorian)
                    Text(String(localized: "calendar.hijri")).tag(CalendarSystem.hijri)
                }
                .pickerStyle(.segmented)
                .listRowSeparator(.hidden)

                Picker(String(localized: "settings.number_style"), selection: $settings.numberStyle) {
                    Text("١ ٢ ٣").tag(NumberStyle.arabic)
                    Text("1 2 3").tag(NumberStyle.western)
                }
                .pickerStyle(.segmented)
                .listRowSeparator(.hidden)
            }

            // ── Duration ───────────────────────────────────────────────
            Section {
                ForEach(DurationCountMode.allCases, id: \.rawValue) { mode in
                    HStack {
                        Text(mode.localizedName)
                        Spacer()
                        if settings.durationCountMode == mode {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundStyle(.appPrimary)
                        }
                    }
                    .contentShape(Rectangle())
                    .onTapGesture {
                        withAnimation { settings.durationCountMode = mode }
                    }
                }
            } header: {
                Text(String(localized: "settings.section.duration"))
            } footer: {
                Text(String(localized: "settings.duration_footer"))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            // ── About ──────────────────────────────────────────────────
            Section(String(localized: "settings.section.about")) {
                HStack {
                    Text(String(localized: "settings.calendar_source"))
                    Spacer()
                    Text("أم القرى")
                        .foregroundStyle(.secondary)
                }
                HStack {
                    Text(String(localized: "settings.version"))
                    Spacer()
                    Text("1.0.0")
                        .foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle(String(localized: "tab.settings"))
        .navigationBarTitleDisplayMode(.large)
    }
}
