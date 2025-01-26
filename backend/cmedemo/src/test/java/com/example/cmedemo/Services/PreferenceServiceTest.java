package com.example.cmedemo.Services;

import com.example.cmedemo.Models.Preference;
import com.example.cmedemo.Repositories.PreferenceRepository;
import com.example.cmedemo.MockData.MockDataGenerator;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PreferenceServiceTest {

    @Mock
    private PreferenceRepository preferenceRepository;

    @InjectMocks
    private PreferenceService preferenceService;

    @Test
    void testGetPreferences() {
        // Arrange
        String employeeId = "E48568";
        String startDate = "2025-01-27";
        String endDate = "2025-01-31";
        List<Preference> mockPreferences = MockDataGenerator.generatePreferences();

        when(preferenceRepository.findByEmployeeIdAndStartDateAndEndDate(employeeId, startDate, endDate))
                .thenReturn(mockPreferences);

        List<Preference> preferences = preferenceService.getPreferences(employeeId, startDate, endDate);

        assertNotNull(preferences);
        assertEquals(2, preferences.size());
        assertEquals("non-veg", preferences.get(0).getVegPreference());
        assertEquals("veg", preferences.get(1).getVegPreference());

        verify(preferenceRepository, times(1))
                .findByEmployeeIdAndStartDateAndEndDate(employeeId, startDate, endDate);
    }

    @Test
    void testSavePreferences() {
        List<Preference> mockPreferences = MockDataGenerator.generatePreferences();

        preferenceService.savePreferences(mockPreferences);

        verify(preferenceRepository, times(1)).saveAll(mockPreferences);
    }
}
