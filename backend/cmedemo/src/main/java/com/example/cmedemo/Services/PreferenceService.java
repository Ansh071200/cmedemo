package com.example.cmedemo.Services;

import com.example.cmedemo.Models.Preference;
import com.example.cmedemo.Repositories.PreferenceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreferenceService {

    @Autowired
    private final PreferenceRepository preferenceRepository;

    public PreferenceService(PreferenceRepository preferenceRepository) {
        this.preferenceRepository = preferenceRepository;
    }

    public List<Preference> getPreferences(String employeeId, String startDate, String endDate) {
        return preferenceRepository.findByEmployeeIdAndStartDateAndEndDate(employeeId, startDate, endDate);
    }

    public void savePreferences(List<Preference> preferences) {
        preferenceRepository.saveAll(preferences);
    }
}
