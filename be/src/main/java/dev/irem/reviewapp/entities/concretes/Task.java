package dev.irem.reviewapp.entities.concretes;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "Tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "scores")
    private List<String> scores;

    @Column(name = "overallAssessment")
    private String overallAssessment;

    @Column(name = "detailedComments")
    private List<String> detailedComments;

    @Column(name = "review")
    private String review;

    @Column(name = "articleId")
    private String articleId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
