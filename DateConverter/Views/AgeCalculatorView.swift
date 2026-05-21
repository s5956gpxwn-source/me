import SwiftUI

struct AgeCalculatorView: View {

    @StateObject private var vm = AgeViewModel()
    @EnvironmentObject private var settings: AppSettings

    var body: some View {
        ScrollView {
            VStack(spacing: 18) {

                // ── Calendar Type Toggle ────────────────────────────────
                SectionCard {
                    CalendarToggle(selected: Binding(
                        get: { vm.inputSystem },
                        set: { vm.switchSystem($0) }
                    ))
                    .frame(maxWidth: .infinity)
                }

                // ── Birth Date ─────────────────────────────────────────
                SectionCard(
                    title: String(localized: "age.birthdate_label"),
                    icon: "birthday.cake",
                    accent: .appPrimary
                ) {
                    WheelDatePicker(
                        day:    $vm.birthDate.day,
                        month:  $vm.birthDate.month,
                        year:   $vm.birthDate.year,
                        system: vm.inputSystem
                    )
                    .onChange(of: vm.birthDate) { vm.calculate() }
                }

                // ── Input display ──────────────────────────────────────
                SectionCard {
                    DateDisplayCard(
                        value: vm.birthDate,
                        numberStyle: settings.numberStyle,
                        label: String(localized: "age.birthdate_label")
                    )
                }

                // ── Calculate Button ───────────────────────────────────
                Button {
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.7)) {
                        vm.calculate()
                    }
                } label: {
                    Text(String(localized: "age.calculate"))
                        .font(.headline)
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 14)
                        .background(
                            RoundedRectangle(cornerRadius: 14, style: .continuous)
                                .fill(Color.appPrimary)
                        )
                }
                .buttonStyle(.plain)

                // ── Result ─────────────────────────────────────────────
                if let result = vm.result {
                    SectionCard(
                        title: String(localized: "age.result_title"),
                        icon: "person.fill.checkmark",
                        accent: .appSecondary
                    ) {
                        Text(result.formatted(numberStyle: settings.numberStyle))
                            .font(.title2.weight(.bold))
                            .multilineTextAlignment(.center)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)

                        Divider()

                        VStack(spacing: 8) {
                            DateDisplayCard(
                                value: result.gregorianDate,
                                numberStyle: settings.numberStyle,
                                label: String(localized: "age.today_gregorian"),
                                accent: .appPrimary
                            )
                            DateDisplayCard(
                                value: result.hijriDate,
                                numberStyle: settings.numberStyle,
                                label: String(localized: "age.today_hijri"),
                                accent: .appSecondary
                            )
                        }
                    }
                    .transition(.opacity.combined(with: .move(edge: .bottom)))
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 20)
        }
        .background(Color.appBackground.ignoresSafeArea())
        .navigationTitle(String(localized: "tab.age"))
        .navigationBarTitleDisplayMode(.large)
    }
}
