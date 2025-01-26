package com.example.cmedemo.Controllers;

import com.example.cmedemo.Models.Preference;
import com.example.cmedemo.Services.PreferenceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/preferences")
public class PreferenceController {

    @Autowired
    private final PreferenceService preferenceService;

    public PreferenceController(PreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @GetMapping
    public ResponseEntity<List<Preference>> getPreferences(
            @RequestParam String employeeId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        List<Preference> preferences = preferenceService.getPreferences(employeeId, startDate, endDate);
        return ResponseEntity.ok(preferences);
    }

    @PostMapping
    public ResponseEntity<String> savePreferences(@RequestBody List<Preference> preferences) {
        System.out.println("Hello come check here");
        System.out.println(preferences);
        System.out.println("Hello come check here");
        preferenceService.savePreferences(preferences);
        return ResponseEntity.ok("Preferences saved successfully");
    }
}
