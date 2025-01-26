package com.example.cmedemo.MockData;

import com.example.cmedemo.Models.Preference;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class MockDataGenerator {

    public static List<Preference> generatePreferences() {
        List<Preference> preferences = new ArrayList<>();

        preferences
                .add(new Preference(1, "E48568", LocalDate.parse("2025-01-29"), "2025-01-27", "2025-01-31", "non-veg",
                        "Ansh Jaiswal"));
        preferences.add(new Preference(2, "E48568", LocalDate.parse("2025-01-29"), "2025-01-27", "2025-01-31", "veg",
                "Ansh Jaiswal"));

        return preferences;
    }
}
